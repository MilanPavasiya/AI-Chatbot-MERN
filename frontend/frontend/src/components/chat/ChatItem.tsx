import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
	// Split based on code block indicators
	if (message.includes('```')) {
		const blocks = message.split('```').filter(Boolean); // Removes empty blocks
		return blocks;
	}
	// If no code block exists, return message as a single block array
	return [message];
}

function isCodeBlock(str: string) {
	// Check for potential code block symbols and keywords
	return (
		str.includes('=') ||
		str.includes(';') ||
		str.includes('[') ||
		str.includes(']') ||
		str.includes('{') ||
		str.includes('}') ||
		str.includes('#') ||
		str.includes('//')
	);
}

const ChatItem = ({
	content,
	role,
}: {
	content: string;
	role: 'user' | 'assistant';
}) => {
	const messageBlocks = extractCodeFromString(content);
	const auth = useAuth();

	// Ensure we have a name and handle missing/undefined cases
	const userInitials = auth?.user
		? `${auth.user.name[0]}${auth.user.name.split(' ')[1]?.[0] || ''}`
		: 'U';

	return role === 'assistant' ? (
		<Box
			sx={{
				display: 'flex',
				p: 2,
				bgcolor: '#004d5612',
				gap: 2,
				borderRadius: 2,
				my: 1,
			}}>
			<Avatar sx={{ ml: '0' }}>
				<img src='openai.png' alt='openai' width={'30px'} />
			</Avatar>
			<Box>
				{messageBlocks.map((block, index) =>
					isCodeBlock(block) ? (
						<SyntaxHighlighter
							key={index}
							style={coldarkDark}
							language='javascript'>
							{block}
						</SyntaxHighlighter>
					) : (
						<Typography key={index} sx={{ fontSize: '20px' }}>
							{block}
						</Typography>
					)
				)}
			</Box>
		</Box>
	) : (
		<Box
			sx={{
				display: 'flex',
				p: 2,
				bgcolor: '#004d56',
				gap: 2,
				borderRadius: 2,
			}}>
			<Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
				{userInitials}
			</Avatar>
			<Box>
				{messageBlocks.map((block, index) =>
					isCodeBlock(block) ? (
						<SyntaxHighlighter
							key={index}
							style={coldarkDark}
							language='javascript'>
							{block}
						</SyntaxHighlighter>
					) : (
						<Typography key={index} sx={{ fontSize: '20px' }}>
							{block}
						</Typography>
					)
				)}
			</Box>
		</Box>
	);
};

export default ChatItem;
