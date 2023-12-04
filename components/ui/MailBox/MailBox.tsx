// components/Mailbox.tsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import EmailDetails from './EmailDetails';
import './MailBox.scss';

export interface Email {
  id: number;
  subject: string;
  from: string;
  time: string;
  message: string;
  read?: string;
  tag?: string;
}

export interface MailboxProps {
  emails: Email[];
}

const Mailbox: React.FC<MailboxProps> = ({ emails }) => {
  const [selectedEmailId, setSelectedEmailId] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<string>('inbox');

  const openEmail = (id: number) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, read: 'true' } : email
    );

    setSelectedEmailId(id);
  };

  const deleteMessage = (id: number) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, tag: 'deleted' } : email
    );

    let newSelectedEmailId = 0;
    for (const email of updatedEmails) {
      if (email.tag === currentSection) {
        newSelectedEmailId = email.id;
        break;
      }
    }

    setSelectedEmailId(newSelectedEmailId);
  };

  const setSidebarSection = (section: string) => {
    let newSelectedEmailId = selectedEmailId;
    if (section !== currentSection) {
      newSelectedEmailId = 0;
    }

    setCurrentSection(section);
    setSelectedEmailId(newSelectedEmailId);
  };

  const currentEmail = emails.find((email) => email.id === selectedEmailId);

  return (
    <div className='flex mailbox-container'>
      <Sidebar
        emails={emails}
        setSidebarSection={(section) => setSidebarSection(section)}
      />
      <div className="inbox-container">
        <EmailList
          emails={emails.filter((x) => x.tag === currentSection)}
          onEmailSelected={(id) => openEmail(id)}
          selectedEmailId={selectedEmailId}
          currentSection={currentSection}
        />
        <EmailDetails
          email={currentEmail}
          onDelete={(id) => deleteMessage(id)}
        />
      </div>
    </div>
  );
};

export default Mailbox;
