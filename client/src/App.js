import { Routes, Route } from 'react-router-dom';
// import CssBaseline from "@mui/material/CssBaseline";
import { useValidateUserQuery } from './store';
import CustomAppBar from './components/CustomAppBar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateRecipePage from './pages/CreateRecipePage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import FeaturedRecipesPage from './pages/FeaturedRecipesPage';
import AboutPage from './pages/AboutPage';
import Box from '@mui/material/Box';

function App() {
  const { data, isLoading } = useValidateUserQuery();

  return (
    <Box>
      <CustomAppBar
        loading={isLoading}
        authenticated={data?.authenticated}
        name={!isLoading && data?.user?.name}
      />
      <Routes>
        <Route
          path="/"
          exact
          element={
            !isLoading && (
              <CreateRecipePage
                userId={data?.user?.userId}
                history={data?.user?.history}
                savedRecipes={data?.user?.recipes}
              />
            )
          }
        />
        <Route path="/login" exact Component={LoginPage} />
        <Route path="/register" exact Component={RegisterPage} />
        <Route
          path="/saved_recipes"
          exact
          element={
            !isLoading && <SavedRecipesPage recipes={data?.user?.recipes} />
          }
        />
        <Route
          path="/featured_recipes"
          exact
          element={!isLoading && <FeaturedRecipesPage />}
        />
        <Route path="/about" exact element={<AboutPage />} />
      </Routes>
    </Box>
  );
}

export default App;
