import '../styles/globals.css';
import Nav from '../components/nav/nav';
import style from '../styles/App.module.css';
import NavItem from '../components/navItem/navItem';
import NavLogo from '../components/navLogo/navLogo';
import {useUser} from "../utils/firebase/useUser";


export default function MyApp({ Component, pageProps }) {
	const { user } = useUser();
	const features = ['submit', 'admin', 'confessions', 'voicemail'];
	return (
		<>
			<Nav type={'icon links'}>
				<NavLogo href={'/'}><img className={style.logo} src="/images/logo.jpg" alt={'fluisterlogo UAntwerpen confessions'}/></NavLogo>
				{ features.includes('submit') && (<NavItem href={'/'}>Confess</NavItem>)}
				{ features.includes('confessions') && (<NavItem href={'/confessions'}>Confessions</NavItem>)}
				{ features.includes('voicemail') && (<NavItem href={'/voicemail'}>Voicemail</NavItem>)}


				{ features.includes('admin') && (user?.isAdmin) && (<NavItem href={'/admin'}>Admin</NavItem>)}
				{ features.includes('login') && (<NavItem href={'/login'} right>{user?.id ? user.name ?? user.email : 'Login'}</NavItem>)}
			</Nav>

			<section className={style.content}>
				<Component {...pageProps} />
			</section>
		</>
	);
}
