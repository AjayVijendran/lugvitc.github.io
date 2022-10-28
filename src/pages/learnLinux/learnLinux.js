import { useSearchParams } from 'react-router-dom';

import PrevNextSessionLinks from '../../components/prevNextSessionLinks/prevNextSessionLinks';
import ShowAfterTypewriter from '../../components/showAfterTypewriter/showAfterTypwriter';
import TerminalPrompt from '../../components/terminalPrompt/terminalPrompt';
import TerminalWindow from '../../components/terminal/terminalWindow';
import LugNavLink from '../../components/lugLink/lugNavLink';

import Session1 from './session1';
import Session2 from './session2';
import Session3 from './session3';
import Session4 from './session4';
import Session5 from './session5';
import Session6 from './session6';

import util from '../../styles/util.module.css';
import styles from './learnLinux.module.css';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';


const sessions = [
    {
        title: 'Linux: What? Why? How?',
        content: <Session1 />,
        ytVideoElement: (
        <div className={util.container}>
            <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/nZDx0dSeg6w'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className={util.video}
            />
        </div>
        )
    },
    {
        title: 'Know the terminal',
        content: <Session2 />,
	ytVideoElement: (
        <div className={util.container}>
            <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/IE1LKumWW7A'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className={util.video}
            />
        </div>
        )

    },
    {
        title: 'Know the system',
        content: <Session3 />,
	ytVideoElement: (
        <div className={util.container}>
            <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/r7zz63Xt56E'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className={util.video}
            />
        </div>
        )

    },
    {
        title: 'Processes and Packages',
        content: <Session4 />,
	ytVideoElement: (
        <div className={util.container}>
            <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/H6Y0yRxu2Rs'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className={util.video}
            />
        </div>
        )

    },
    {
        title: 'Advanced Features',
        content: <Session5 />,
	ytVideoElement: (
        <div className={util.container}>
            <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/szIsA5awyP8'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className={util.video}
            />
        </div>
        )

    },
    {
        title: 'Desktop Customization',
        content: <Session6 />,
	ytVideoElement: (
        <div className={util.container}>
            <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/QFWTdmm2RG8'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className={util.video}
            />
        </div>
	)

    }
];

export default function LearnLinux() {
    const [params] = useSearchParams();
    const sessionParam = params.get('session');
    if (sessionParam) {
        const sessionIndex = Number(sessionParam) - 1;
        if (
            sessionIndex !== null &&
            sessionIndex >= 0 &&
            sessionIndex < sessions.length
        ) {
            const session = sessions[sessionIndex];
            const nextIndex =
                sessionIndex < sessions.length - 1 ? sessionIndex + 1 : null;
            const prevIndex = sessionIndex > 0 ? sessionIndex - 1 : null;
            return (
                <TerminalWindow
                    title={`Learn Linux #${sessionIndex + 1}`}
                    prompts={[
                        {
                            path: '/learn-linux',
                            command: `./'${session.title}'`
                        }
                    ]}
                >
                    <LugNavLink link='/learn-linux'>Go back</LugNavLink>
                    <h1>{session.title}</h1>
                    <PrevNextSessionLinks
                        prevIndex={prevIndex}
                        prevSession={sessions[prevIndex]}
                        nextIndex={nextIndex}
                        nextSession={sessions[nextIndex]}
                    />

                    <div className={styles.sessionConent}>
                    <center>{session.ytVideoElement && session.ytVideoElement}</center>
                        {session.content}
                    </div>
                    <PrevNextSessionLinks
                        prevIndex={prevIndex}
                        prevSession={sessions[prevIndex]}
                        nextIndex={nextIndex}
                        nextSession={sessions[nextIndex]}
                    />
                </TerminalWindow>
            );
        } else return <>wrong param</>;
    } else
        return (
            <TerminalWindow
                title='Learn Linux'
                prompts={[
                    { path: '~', command: 'cd learn-linux' },
                    { path: '~/learn-linux', command: 'cat learn-linux.txt' }
                ]}
            >
                Linux learning resources by LUG VITC
                <div className={util.v1emSpacer} />
                <ShowAfterTypewriter
                    text={'ls -l'}
                    textContainer={text => (
                        <TerminalPrompt path={'~/learn-linux'}>
                            {text}
                        </TerminalPrompt>
                    )}
                >
                    <div className={util.v1emSpacer} />
                    <span className={util.hideBelow600}>
                        drwxrwxrwx 1 root root{' '}
                    </span>{' '}
                    learn-linux.txt
                    {sessions.map((session, index) => (
                        <div key={index}>
                            <span className={util.hideBelow600}>
                                drwxrwxrwx 1 root root{' '}
                            </span>
                            <LugNavLink
                                link={`/learn-linux?session=${index + 1}`}
                            >
                                {session.title}
                            </LugNavLink>
                        </div>
                    ))}
                </ShowAfterTypewriter>
            </TerminalWindow>
        );
}

