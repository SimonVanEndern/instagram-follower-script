function checkFollowWindowOpenAndLoadAccounts () {
	let followArea = document.getElementsByClassName("isgrP");
	document.getElementsByClassName("isgrP").item(0).scrollBy(0, 1000);
	return followArea.length > 0;
}

function getAccountsToFollow () {
	let followers = document.getElementsByClassName("uu6c_");
	let accounts = [];
	for (let i = 0; i < followers.length; i++) {
		let account = followerToAccount(followers.item(i));
		if (account.getStatus() === "notFollowing") {
			accounts.push(account);
		}
	}
	return accounts;
}

class Account {
	constructor(name, status, action) {
		this.name = name;
		this.status = status;
		this.action = action;
	}

	getName() {
		return this.name;
	}

	getStatus() {
		return this.status;
	}

	act() {
		this.action.click();
	}
}

function followerToAccount (follower) {
	let name = follower
				.children.item(0)
				.children.item(1)
				.children.item(0)
				.children.item(0)
				.children.item(0)
				.innerText

	let status = follower.children.item(1).children.item(0).innerText === "Follow" ? "notFollowing" : "Following";
	let action = follower.children.item(1).children.item(0);

	return new Account(name, status, action);
}

function execute () {
	if (!checkFollowWindowOpenAndLoadAccounts()) {
		console.log("No Window with Followers found");
	}
	setTimeout(function () {
		let accounts = getAccountsToFollow();
		setInterval(function () {
			if (accounts.length > 0) {
				let account = accounts.shift();
				account.act();
			} else {
				checkFollowWindowOpenAndLoadAccounts();
				accounts = getAccountsToFollow();
			}
		}, 5000);
	}, 4000);
}

execute();