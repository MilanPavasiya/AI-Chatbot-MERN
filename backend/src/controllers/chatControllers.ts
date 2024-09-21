import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { configureOpenAI } from '../config/openaiConfig.js';
import { OpenAIApi, ChatCompletionRequestMessage } from 'openai';

export const generateChatCompletion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { message } = req.body;

	try {
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			return res
				.status(401)
				.json({ message: 'User not registered OR Token malfunctioned' });
		}

		// grab chats of user
		const chats = user.chats.map(({ role, content }) => ({
			role,
			content,
		})) as ChatCompletionRequestMessage[];

		// Append the latest user message
		chats.push({ role: 'user', content: message });

		// Save the new user message to the database
		user.chats.push({ role: 'user', content: message });

		// Configure and call the OpenAI API
		const openai = new OpenAIApi(configureOpenAI());
		const chatResponse = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: chats,
		});
		console.log('Chat Response:', chatResponse.data);

		// Ensure the response contains a valid message from OpenAI
		const assistantMessage = chatResponse.data.choices[0]?.message;
		if (!assistantMessage) {
			return res.status(500).json({ message: 'No response from OpenAI' });
		}

		// Save assistant response to user's chat history
		user.chats.push(assistantMessage);
		await user.save();

		// Return updated chat history to the client
		return res.status(200).json({ chats: user.chats });
	} catch (error) {
		console.error('Error in generating chat completion:', error);
		return res
			.status(500)
			.json({ message: 'Something went wrong', error: error.message });
	}
};

export const sendChatsToUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//user token check
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			return res.status(401).send('User not registered OR Token malfunctioned');
		}
		if (user._id.toString() !== res.locals.jwtData.id) {
			return res.status(401).send("Permissions didn't match");
		}
		return res.status(200).json({ message: 'OK', chats: user.chats });
	} catch (error) {
		console.log(error);
		return res.status(200).json({ message: 'ERROR', cause: error.message });
	}
};

export const deleteChats = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//user token check
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			return res.status(401).send('User not registered OR Token malfunctioned');
		}
		if (user._id.toString() !== res.locals.jwtData.id) {
			return res.status(401).send("Permissions didn't match");
		}
		//@ts-ignore
		user.chats = [];
		await user.save();
		return res.status(200).json({ message: 'OK' });
	} catch (error) {
		console.log(error);
		return res.status(200).json({ message: 'ERROR', cause: error.message });
	}
};
