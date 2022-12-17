# What is this?

This is an example of a serverless Discord Bot, made with **Cloudflare wrangler** and **glenstack** package for workers.
You can clone this repository and work on it to understand how to create a Discord Bot based on Cloudflare workers. If you need a yt tutorial, then you should click [here]('https://www.youtube.com/watch?v=xRt9PwphmY8').

# How to create serverless Discord Bot

First of all, you need to install `wrangler` package globally on your pc. To do it, go in your project folder and type `npm install wrangler -g`.
Once you have installed it, type `wrangler login` in your console. If you are a Windows user and it gives an error which says like "Scripting is disabled" then you need to activate scripts execution (search on Google how to do it).

Once you have logged in, type `wrangler generate 'name of your worker' https://github.com/EverlastingBugstopper/worker-typescript-template`. This will create a worker on Cloudflare and it will generate a folder with a Typescript template of Discord Serverless Bot.

Now, you need to change some things in this template.
First of all, type `npm install` in your console, then, copy the same things that are in my `wrangler.toml` and change:
- `name`
- `compatibility_date` given by the project you've generated before
- `account_id` given by Cloudflare in workers section

If you have done with this, you need to install cf-workers-discord-bot, to do it, type `npm install @glenstack/cf-workers-discord-bot`, and change your template index.ts code with this:
```typescript
import {
	createSlashCommandHandler,
	ApplicationCommand,
	InteractionHandler,
	Interaction,
	InteractionResponse,
	InteractionResponseType,
} from "@glenstack/cf-workers-discord-bot";
  
const helloCommand: ApplicationCommand = {
	name: "hi",
	description: "Say hi to you",
};
  
const helloHandler: InteractionHandler = async (
	interaction: Interaction
	): Promise<InteractionResponse> => {
	const userID = interaction.member.user.id;
  
	return {
	  type: InteractionResponseType.ChannelMessageWithSource,
	  data: {
		content: `Hi <@${userID}>!`,
		allowed_mentions: {
		  users: [userID],
		},
	  },
	};
  };
  
const slashCommandHandler = createSlashCommandHandler({
	applicationID: "BOT ID",
	applicationSecret: 'BOT SECRET',
	publicKey: "BOT PUBLIC KEY",
	commands: [[helloCommand, helloHandler]],
});
  
addEventListener("fetch", (event) => {
	event.respondWith(slashCommandHandler(event.request));
});
```
You have almost finished. In index.ts, replace:
- `applicationID` with your bot's ID
- `applicationSecret` with your bot's secret (can be found in OAuth2 page)
- `publicKey` with your bot's public key
Once you have done this, go on your console and type
`wrangler publish`
This will give you a link, and if you click it, it should bring you to authorization page of your discord bot.
Now, wait 1 hour until Discord publishes the slash commands to all your bot's servers.

That's it, you shold have your serverless bot

Feel free to contact `Viciox#2909` on Discord if you have any issues.