export class Acts {
    constructor() {
        this.acts = {
            Park: [
                { description: "Plant a tree", exp: 50 },
                { description: "Organize a community cleanup", exp: 100 },
            ],
            School: [
                { description: "Tutor a classmate", exp: 75 },
                { description: "Start a recycling program", exp: 125 },
            ],
            Library: [
                { description: "Donate books", exp: 60 },
                { description: "Volunteer as a reading buddy", exp: 110 },
            ],
            "Community Center": [
                { description: "Organize a food drive", exp: 90 },
                { description: "Teach a skill to seniors", exp: 140 },
            ],
            Hospital: [
                { description: "Volunteer at the information desk", exp: 80 },
                { description: "Deliver flowers to patients", exp: 120 },
            ]
        };
    }

    generateAct(location, playerLevel) {
        console.log(`Generating act for ${location}, player level: ${playerLevel}`);
        const locationActs = this.acts[location];
        if (!locationActs) {
            console.error(`No acts found for location: ${location}`);
            return null;
        }
        const act = locationActs[Math.floor(Math.random() * locationActs.length)];
        act.exp = Math.floor(act.exp * (1 + (playerLevel - 1) * 0.1));
        return act;
    }
}