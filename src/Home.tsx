import art from './img/art.svg'

function Home() {
    return (
        <div className="wrapper">
            <section className="article">
                <div className="card">
                    <img src={art} alt="beautiful landscape art" />
                    <h1>My React Website</h1>
                    <h3>&#127912; by sebastian7722</h3>
                </div>
            </section>
        </div>
    );
}

export default Home;