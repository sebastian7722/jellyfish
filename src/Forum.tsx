import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import Ripples from 'react-ripples'
import { fetchData, writeData } from './lib/firebase';
import { MdExitToApp, MdWarning } from 'react-icons/md';
import { useAuth } from './lib/firebaseContext';
import Loader from './components/Loader';
import google from './img/google.svg';

function Forum() {
    const [posts, setPosts] = useState<any>([]);

    const [refreshFetch, setRefreshFetch] = useState(false);

    const { signIn, isSignedIn } = useAuth();

    const userData: object = useAuth().userData!;
    const checkUser: () => void = useAuth().checkUser!;
    const logout: () => void = useAuth().logout!;

    useEffect(() => {
        checkUser();
    }, []) //eslint-disable-line

    useEffect(() => {
        fetchData().then((res) => {
            setPosts(res);
        })
    }, [refreshFetch])

    interface Post {
        id: any;
        photoURL: any;
        username: any;
        time: any;
        content: any;
    }

    return (
        <main className="content">
            {!isSignedIn && <SignComponent signIn={signIn} />}
            {isSignedIn && <PostComponent logout={logout} userData={userData} refreshFetch={refreshFetch} setRefreshFetch={setRefreshFetch} />}
            <div className="post-cards">
                {(posts && posts.length > 0) && posts.map((post: Post) => {
                    const { id, photoURL, username, time, content } = post;
                    return (
                        <PostCard key={id} photoURL={photoURL} username={username} time={time} content={content} />
                    );
                })}
            </div>
            {(!posts || posts.length === 0) && <Loader />}
        </main>
    );
}

interface Props {
    photoURL: string;
    username: string;
    time: string;
    content: string;
}

function PostCard(props: Props) {
    const { photoURL, username, time, content } = props;

    return (
        <div className="post-card">
            <div className="user">
                <div className="avatar"><img className="avatar-img" referrerPolicy="no-referrer" src={photoURL} alt="user" /></div>
                <div className="avatar-description">
                    <div className="avatar-name">{username}</div>
                    <div className="avatar-timestamp">{time}</div>
                </div>
            </div>
            <div className="user-text">{content}</div>
        </div>
    );
}

function SignComponent(props: any) {
    const { signIn } = props;

    return (
        <>
            <div className="alert-container">
                <div className="alert">
                    <MdWarning className="alert-ico" />
                    <div className="alert-text">You must be logged in to create new post</div>
                </div>
            </div>
            <div className="google-container">
                <GoogleBtn signIn={signIn} />
            </div>
        </>
    );
}

function GoogleBtn(props: { signIn: any }) {
    const { signIn } = props;
    return (
        <div className="google-btn" onClick={() => signIn()}>
            <img className="google-img" src={google} alt="google" />
            <div className="google-text">Sign in with Google</div>
        </div>
    );
}

interface PostProps {
    logout: any;
    userData?: {
        displayName: string;
        photoURL: string;
    } | any;
    refreshFetch: boolean;
    setRefreshFetch: Dispatch<SetStateAction<boolean>>;
}

function PostComponent(props: PostProps) {
    const { logout, userData, refreshFetch, setRefreshFetch } = props;
    const { displayName, photoURL } = userData;
    const [text, setText] = useState("");
    const [btnStyle, setBtnStyle] = useState("btn btn-primary btn-disabled");
    const [errStyle, setErrStyle] = useState("post-error");
    const [disabled, setDisabled] = useState(true);

    const handleWriteData: () => void = () => {
        if (text.length >= 10) {
            writeData(text, displayName, photoURL);
            setText("");
            setTimeout(() => {
                setRefreshFetch(!refreshFetch);
            }, 5000);
        } else {
            console.log("write more characters minimum is 10!")
        }
    };

    const handleStyleBtn: () => void = () => {
        if (text.length >= 10) {
            setBtnStyle("btn btn-primary");
            setErrStyle("post-error hidden");
            setDisabled(false);
        } else {
            setBtnStyle("btn btn-primary btn-disabled");
            setErrStyle("post-error");
            setDisabled(true);
        }
    }

    return (
        <div className="post-container">
            <div className="post-dialog">
                <div className="post-header">
                    <div className="posts-text">Create new post</div>
                    <div className="btn-signout-container">
                        <div className="btn-signout" onClick={() => logout()}><MdExitToApp /></div>
                    </div>
                </div>
                <textarea maxLength={350} onChange={e => { setText(e.target.value); handleStyleBtn() }} value={text} className="post-field"></textarea>
                <div className="post-actions">
                    <div className={errStyle}>Please enter at least 10 characters.</div>
                    <CreatePost eventHandler={handleWriteData} style={btnStyle} disabled={disabled} />
                </div>
            </div>
        </div>
    );
}

interface PropsCreatePost {
    eventHandler: () => void,
    style: string,
    disabled: boolean
}

function CreatePost(props: PropsCreatePost) {
    const { eventHandler, style, disabled } = props;

    return (
        <>
            {disabled && <div className={style} onClick={() => eventHandler()}>Create post</div>}
            {!disabled && <Ripples className="ripple-fix" color="rgba(219, 236, 141, 0.4)"><div className={style} onClick={() => eventHandler()}>Create post</div></Ripples>}
        </>
    );
}

export default Forum;