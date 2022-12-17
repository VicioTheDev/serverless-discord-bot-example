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