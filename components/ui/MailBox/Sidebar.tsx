// components/Sidebar.tsx
import React from 'react';
import { Email } from './MailBox';
import './MailBox.scss';

interface SidebarProps {
  emails: Email[];
  setSidebarSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ emails, setSidebarSection }) => {
    var unreadCount = emails.reduce(
		function(previous, msg) {
			if (msg.read !== "true" ) {
				return previous + 1;
			}
			else {
				return previous;
			}
		}.bind(this), 0);

	var deletedCount = emails.reduce(
		function(previous, msg) {
			if (msg.tag === "deleted") {
				return previous + 1;
			}
			else {
				return previous;
			}
		}.bind(this), 0);

	return (
		<div id="sidebar">
			<div className="sidebar__compose text-black">
				<a href="#" className="btn compose text-white">
					Compose <span className="fa fa-pencil text-black"></span>
				</a>
			</div>
			<ul className="sidebar__inboxes">
				<li onClick={() => { setSidebarSection('inbox'); }}><a>
					<span className="fa fa-inbox"></span> Inbox
					<span className="item-count">{unreadCount}</span></a></li>
				<li onClick={() => { setSidebarSection('sent'); }}><a>
					<span className="fa fa-paper-plane"></span> Sent
					<span className="item-count">0</span></a></li>
				<li onClick={() => { setSidebarSection('drafts'); }}><a>
					<span className="fa fa-pencil-square-o"></span> Drafts
					<span className="item-count">0</span>
					</a></li>
				<li onClick={() => { setSidebarSection('deleted'); }}><a>
					<span className="fa fa-trash-o"></span> Trash
					<span className="item-count">{deletedCount}</span>
					</a></li>
			</ul>
		</div>
	);
};

export default Sidebar;
