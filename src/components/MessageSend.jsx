import React from 'react';

const MessageSend = ({ handleSubmit, text, setText }) => {
	return (
		<div className='inputf'>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button type="submit" >Send</button>
			</form>
		</div>
	);
};

export default MessageSend;
