import art from './img/art.svg'

function Home() {
    return (
        <main className="article-home">
            <section className="shop-card home-card">
                <img src={art} alt="beautiful landscape art" />
                <h1 className="title">My React Website</h1>
                <h3 className="author">&#127912; by sebastian7722</h3>
            </section>
        </main>
    );
}

export default Home;