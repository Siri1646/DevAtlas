import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

/* ---------------- DB ---------------- */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✔"))
  .catch(err => console.log("Mongo error:", err));

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

/* ---------------- AUTH ---------------- */

app.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email or password missing"
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashed });

    res.json({ msg: "Registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid user" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token });
});

/* ---------------- AUTH MIDDLEWARE ---------------- */

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

/* ---------------- GITHUB GRAPHQL (REAL DATA) ---------------- */

app.get("/github/:username", auth, async (req, res) => {
  try {
    const username = req.params.username;

    const query = `
    {
      user(login: "${username}") {
        login
        avatarUrl
        followers { totalCount }
        repositories(first: 100) {
  nodes {
    name
    stargazerCount
    forkCount
    url
    owner {
      login
    }
    primaryLanguage {
      name
    }
  }
}
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }`;

    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    console.log("GRAPHQL RESPONSE:", JSON.stringify(response.data, null, 2));
    if (response.data.errors) {
  console.log("GRAPHQL ERRORS:", response.data.errors);
  return res.status(500).json({
    msg: "GitHub GraphQL failed",
    error: response.data.errors,
  });
}
    const user = response.data.data.user;

if (!user) {
  return res.status(404).json({
    msg: "GitHub user not found"
  });
}

console.log(
  "TOTAL CONTRIBUTIONS:",
  user.contributionsCollection.contributionCalendar.totalContributions
);

   let stars = 0;
let languages = {};

user.repositories.nodes.forEach((r) => {
  stars += r.stargazerCount;

  if (r.primaryLanguage) {
    const lang = r.primaryLanguage.name;
    languages[lang] = (languages[lang] || 0) + 1;
  }
});

const totalForks = user.repositories.nodes.reduce(
  (sum, r) => sum + r.forkCount,
  0
);

const totalRepos = user.repositories.nodes.length;

const totalContributions =
  user.contributionsCollection.contributionCalendar.totalContributions;

const avgStars =
  totalRepos > 0 ? stars / totalRepos : 0;

/* ===== SCORES OUT OF 100 ===== */

const communityScore = Math.min(
  100,
  Math.round(
    user.followers.totalCount * 2 +
    stars * 0.5 +
    totalRepos * 5
  )
);

const activityScore = Math.min(
  100,
  Math.round(
    Math.sqrt(totalContributions) * 10
  )
);

const qualityScore = Math.min(
  100,
  Math.round(avgStars * 10)
);

const profileStrength = Math.max(
  5,
  Math.min(
    100,
    Math.round(
      communityScore * 0.35 +
      activityScore * 0.35 +
      qualityScore * 0.30
    )
  )
);
let level = "Beginner";

if (profileStrength >= 90)
  level = "Elite";
else if (profileStrength >= 75)
  level = "Expert";
else if (profileStrength >= 60)
  level = "Advanced";
else if (profileStrength >= 40)
  level = "Intermediate";
    const today = new Date();

const heatmap =
  user.contributionsCollection.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .filter((d) => new Date(d.date) <= today)
    .map((d) => ({
      date: d.date,
      count: d.contributionCount
    }));

console.log("USER:", user.login);
console.log("TOTAL CONTRIBUTIONS:", totalContributions);

    res.json({
  user,
  languages,
  heatmap,
  repos: user.repositories.nodes,

  totalStars: stars,
  totalForks,
  totalRepos,
  totalContributions,

  communityScore,
  activityScore,
  qualityScore,
  profileStrength,

  avgStars,
  level
});

  } catch (err) {
  console.log("REGISTER ERROR:", err.message);

  res.status(500).json({
    msg: "Server error",
    error: err.message
  });
}
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});