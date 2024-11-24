const LibraryArray = [
    {
        S_Name: "Mercy Thompson",
        Description: "The Mercy Thompson series by Patricia Briggs is a popular urban fantasy series centered around Mercedes 'Mercy' Thompson, a Volkswagen mechanic with the ability to shapeshift into a coyote. Set in the Tri-Cities area of Washington State, the series blends elements of mystery, romance, and supernatural intrigue.",
        Author: "Patricia Briggs",
        Books_Owned: [
            { Title: "Moon Called" },
            { Title: "Blood Bound" },
            { Title: "Iron Kissed" },
            { Title: "Bone Crossed" },
            { Title: "Silver Borne" },
            { Title: "River Marked" },
            { Title: "Frost Burned" },
            { Title: "Night Broken" },
            { Title: "Fire Touched" },
            { Title: "Silence Fallen" },
            { Title: "Storm Cursed" },
            { Title: "Smoke Bitten" },
            { Title: "Soul Taken" }
        ],
        Storage_Location: {
            Room: "Timo's Bedroom",
            Book_Case: "Enterprise",
            Shelf: 2
        }
    },
    {
        S_Name: "Alpha and Omega",
        Description: "The Alpha and Omega series by Patricia Briggs is a captivating urban fantasy series that follows the adventures of Anna Latham, an Omega werewolf, and Charles Cornick, the enforcer and son of the leader of the North American werewolves. The series blends action, romance, and supernatural elements.",
        Author: "Patricia Briggs",
        Books_Owned: [
            { Title: "On the Prowl (Alpha and Omega novella)" },
            { Title: "Cry Wolf" },
            { Title: "Hunting Ground" },
            { Title: "Fair Game" },
            { Title: "Dead Heat" },
            { Title: "Burn Bright" },
            { Title: "Wild Sign" }
        ],
        Storage_Location: {
            Room: "Timo's Bedroom",
            Book_Case: "Enterprise",
            Shelf: 2
        }
    },
    {
        S_Name: "Kate Daniels",
        Description: "The Kate Daniels series by Ilona Andrews is set in a post-apocalyptic world where magic and technology fluctuate unpredictably. Kate Daniels, a mercenary with a mysterious past, navigates this volatile landscape, dealing with magical creatures, necromancers, and shapeshifters.",
        Author: "Ilona Andrews",
        Books_Owned: [
            { Title: "Magic Bites" },
            { Title: "Magic Burns" },
            { Title: "Magic Strikes" },
            { Title: "Magic Bleeds" },
            { Title: "Magic Slays" },
            { Title: "Magic Rises" },
            { Title: "Magic Breaks" },
            { Title: "Magic Shifts" },
            { Title: "Magic Binds" },
            { Title: "Magic Triumphs" },
            { Title: "Gunmetal Magic" },
            { Title: "Magic Stars" },
            { Title: "Small Magics" }
        ],
        Storage_Location: {
            Room: "Timo's Bedroom",
            Book_Case: "Enterprise",
            Shelf: 1
        }
    },
    {
        S_Name: "Percy Jackson",
        Description: "The Percy Jackson series by Rick Riordan follows the adventures of Percy Jackson, a demigod son of Poseidon, as he navigates the challenges of the modern world and ancient Greek mythology.",
        Author: "Rick Riordan",
        Books_Owned: [
            { Title: "The Lightning Thief" },
            { Title: "The Sea of Monsters" },
            { Title: "The Titan's Curse" },
            { Title: "The Battle of the Labyrinth" },
            { Title: "The Last Olympian" }
        ],
        Storage_Location: {
            Room: "Basement",
            Book_Case: "Olympus",
            Shelf: 5
        }
    }

];

const LibraryAPI = () => {
    return LibraryArray;
  };