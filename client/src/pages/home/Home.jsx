import Appbar from '../../components/appbar/Appbar';
import Feed from '../../components/feeds/Feed';
import RightBar from '../../components/rightbar/RightBar';
import Sidebar from '../../components/sidebar/Sidebar'
import './Home.css';
function Home() {
    return (
        <>
            <Appbar />
            <div className="homeContainer">
                <Sidebar/>
                <Feed />
                <RightBar/>
            </div>
        </>
    );
}
export default Home;