export type SSHKey = {
	name: string;
	key: string;
	id: string;
};

export type Server = {
	name: string;
	ip: string;
	port: string;
	id: string;
	keyId?: string;
	username: string;
	password: string;
	useSSHKey: boolean;
};

export type Settings = {
	theme: string;
	email: string;
	domain: string;
	selectedServerId: string;
};
