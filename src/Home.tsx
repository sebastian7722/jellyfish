import art from './img/art.svg'

function Home() {
    return (
        <section className="article">
                <img src={art} alt="beautiful landscape art" />
                <h1 className="title">My React Website</h1>
                <h3 className="author">&#127912; by sebastian7722</h3>
        </section>
    );
}

export default Home;