// components/EmailDetails.tsx
import React from 'react';
import { Email } from './MailBox';
import { getPrettyDate, getPrettyTime} from './helperMethods';
import './MailBox.scss';

interface EmailDetailsProps {
  email: Email | undefined;
  onDelete: (id: number) => void;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ email, onDelete }) => {
    if (!email) {
		return (
			<div className="email-content empty"></div>
		);
	}
	
	const date = `${getPrettyDate(email.time)} · ${getPrettyTime(email.time)}`;
	
	const getDeleteButton = () => {
		if (email.tag !== 'deleted') {
			return <span onClick={() => { onDelete(email.id); }} className="delete-btn fa fa-trash-o"> Delete </span>;
		}
		return undefined;
	}

	return (
		<div className="email-content">
			<div className="email-content__header">
				<h3 className="email-content__subject">{email.subject}</h3>
				{getDeleteButton()}
				<div className="email-content__time">{date}</div>
				<div className="email-content__from">{email.from}</div>
			</div>
			<div className="email-content__message">{email.message}</div>
		</div>
	);
};

export default EmailDetails;
