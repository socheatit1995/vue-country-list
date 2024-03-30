import {execa} from 'execa';
import fs from "fs";


(async () => {
    try {
        await execa("git",["checkout", "--orphan", "gh-pages"]);
        console.log("Building Started ...");
        await execa("npm", ["run", "build"]);

        const folderName = fs.existsSync("dist") ? "dist" : "build";
        await execa("git", ["--work-tree", folderName, "add", "--all"]);
        await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
        console.log("pushing to gh-pages...");
        await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
        await execa("rm", ["-r", folderName]);
        await execa("git", ["checkout", "-f", "master"]);
        await execa("git", ["branch", "-D", "gh-pages"]);
        console.log("Successfully deplayed, check your settings");

    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
});

