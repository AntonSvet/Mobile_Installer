import "./mainPage.css";
import PageRoute from "./PageRoute/PageRoute";

const MainPage = ({ selectedMenu  }: { selectedMenu: string; }) => {
  return (
    <main className="main">
      <PageRoute route={selectedMenu}  />
    </main>
  );
};

export default MainPage;
