// components/EmailList.tsx
import React from 'react';
import { getPrettyDate } from './helperMethods';
import { Email } from './MailBox';
import './MailBox.scss';

interface EmailListProps {
  emails: Email[];
  onEmailSelected: (id: number) => void;
  selectedEmailId: number;
  currentSection: string;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  onEmailSelected,
  selectedEmailId,
  currentSection,
}) => {
    const EmailListItem = ({ email, onEmailClicked, selected }) => {
        let classes = "email-item";
        if (selected) {
            classes += " selected"
        }
            
        return (
            <div onClick={() => { onEmailClicked(email.id); }} className={classes}>
                <div className="email-item__unread-dot" data-read={email.read}></div>
                <div className="email-item__subject truncate">{email.subject}</div>
                <div className="email-item__details">
                    <span className="email-item__from truncate">{email.from}</span>
                    <span className="email-item__time truncate">{getPrettyDate(email.time)}</span>
                </div>
            </div>
        );
    }

    if (emails.length === 0) {
		return (
			<div className="email-list empty">
				Nothing to see here, great job!
			</div>
		);
	}
	
	return (
		<div className="email-list">
			{
				emails.map(email => {
					return (
						<EmailListItem
							onEmailClicked={(id: number) => { onEmailSelected(id); }}
							email={email}
							selected={selectedEmailId === email.id} />
					);
				})
			}
		</div>
	);
};

export default EmailList;
