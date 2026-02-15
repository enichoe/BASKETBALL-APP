require("dotenv").config();
const mongoose = require("mongoose");
const Team = require("./models/Team");
const Player = require("./models/Player");
const Match = require("./models/Match");
const Sponsor = require("./models/Sponsor");
const Group = require("./models/Group");

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    
    const teamCount = await Team.countDocuments();
    const playerCount = await Player.countDocuments();
    const matchCount = await Match.countDocuments();
    const sponsorCount = await Sponsor.countDocuments();
    const groupCount = await Group.countDocuments();
    
    console.log("--- DB COUNTS ---");
    console.log(`Groups: ${groupCount}`);
    console.log(`Teams: ${teamCount}`);
    console.log(`Players: ${playerCount}`);
    console.log(`Matches: ${matchCount}`);
    console.log(`Sponsors: ${sponsorCount}`);
    
    if (playerCount > 0) {
        const p = await Player.findOne();
        console.log("Sample Player:", JSON.stringify(p, null, 2));
    }
    
    mongoose.connection.close();
  })
  .catch(err => {
      console.error("DB Error:", err);
      process.exit(1);
  });
