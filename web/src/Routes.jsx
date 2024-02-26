// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <PrivateSet unauthenticated='login' >
        <Set wrap={DashboardLayout}>
          <Route path="/" page={HomePage} name="home" />

          <Set wrap={ScaffoldLayout} title="Catalogues" titleTo="catalogues" buttonLabel="New Catalogue" buttonTo="newCatalogue">
            <Route path="/catalogues/new" page={CatalogueNewCataloguePage} name="newCatalogue" />
            <Route path="/catalogues/{id:Int}/edit" page={CatalogueEditCataloguePage} name="editCatalogue" />
            <Route path="/catalogues/{id:Int}" page={CatalogueCataloguePage} name="catalogue" />
            <Route path="/catalogues" page={CatalogueCataloguesPage} name="catalogues" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Categories" titleTo="categories" buttonLabel="New Category" buttonTo="newCategory">
            <Route path="/categories/new" page={CategoryNewCategoryPage} name="newCategory" />
            <Route path="/categories/{id:Int}/edit" page={CategoryEditCategoryPage} name="editCategory" />
            <Route path="/categories/{id:Int}" page={CategoryCategoryPage} name="category" />
            <Route path="/categories" page={CategoryCategoriesPage} name="categories" />
          </Set>

        </Set>
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
