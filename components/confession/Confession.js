import style from './Confession.module.css';
import Id from '../id/Id';
import Article from '../article/Article';
import {dateStringToReadable} from "../../utils/dateHelper";
import Link from 'next/link';

export default function Confession(props) {
	const toClipBoard = async () => {
		const linkToCopy = props.queueId ? `pending/${props.queueId}` : `confessions/${props.id}`
		const res = await navigator.share?.({title: `#${props.id ?? ''} ${props.value}`, url: `https://ua.confessions.link/${linkToCopy}`})
		console.log(res);
	};
	const header = [];
	if(props.triggerWarning) header.push(<span key={'trigger warning'}>TRIGGER WARNING: {props.triggerWarning}</span>);
	if(props.help) header.push(<Link key={'mental help'} href="/help">Hulp nodig?</Link>);
	return (
		<Article
			isStack={props.isStack}
			sensitive={props.help || props.triggerWarning}
			footer={
				<>
					{props.submitted && props.submitted !== 'unknown data' && (
						<span className={style.submitted}>{dateStringToReadable(props.submitted)}</span>
					)}
					<span>
						{(props.queueId || props.id) && (
							<a onClick={toClipBoard}>share</a>
						)}
						{props.facebook_post_id && (
							<a href={`https://www.facebook.com/UAntwerpenConfessions/posts/${props.facebook_post_id?.split('_')[1]}`} target="_blank">
								show on facebook
							</a>
						)}
					</span>
				</>
			}
			header={header.length > 0 && header }
		>
			<Id {...props} />{props.value}

			{props?.url && (
				<img className={style.image} src={props?.url} />
			)}
		</Article>
	);
}

