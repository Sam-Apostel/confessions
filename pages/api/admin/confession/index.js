import {
	getQueuedConfession,
	getQueuedConfessionsAmount,
	verifyIdTokenIsAdmin
} from '../../../../utils/firebase/firebase'

module.exports = async ({ headers: { token }}, res) => {
	try {
		await verifyIdTokenIsAdmin(token);
	} catch (error) {
		return res.status(401).json({message:'You are unauthorised.'});
	}
	try {
		const confession = await getQueuedConfession();
		const amount = await getQueuedConfessionsAmount(); // TODO: improve this with a counter
		return res.status(200).json({confession, amount});
	}catch (error){
		return res.status(404).json({message:'No queued confessions found.'});
	}

};
