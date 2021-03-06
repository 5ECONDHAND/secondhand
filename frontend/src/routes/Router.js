import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import {
  Home,
  Auth,
  Product,
  AddProduct,
  Edit,
  Sales,
  Offers,
  NotFound,
  ProductPreview,
  Wishlist,
} from '../pages'
import { useSelector } from 'react-redux'
// import ScrollToTop from '../components/atoms/global/ScrollToTop'
import { selectUser } from '../redux/slices/userSlice'
import { Layout } from '../components/templates'

const Router = () => {
  const authenticated = useSelector(selectUser)

  const isAuthorized = (authenticated = { data: null }) => {
    return Object.values(authenticated).every((x) => x !== null) ? true : false
  }

  const AuthRoute = ({ isAllowed, redirectPath = '/', children }) => {
    if (isAllowed) {
      return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />
  }

  const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
    if (!isAllowed) {
      if (redirectPath === '/') {
        setTimeout(() => {
          return <Navigate to={redirectPath} replace />
        }, 1000)
      } else {
        return <Navigate to={redirectPath} replace />
      }
    }
    return children ? children : <Outlet />
  }

  return (
    <>
      <BrowserRouter>
        {/* <ScrollToTop /> */}
        <Layout>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route element={<AuthRoute isAllowed={!!authenticated} />}>
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
            </Route>
            <Route element={<ProtectedRoute isAllowed={authenticated} redirectPath="/login" />}>
              <Route path="/edit/:userId" element={<Edit />} />
              <Route path="/sales" element={<Sales />} />
              <Route
                element={
                  <ProtectedRoute
                    isAllowed={isAuthorized(authenticated ? authenticated : { data: null })}
                    redirectPath={`/edit/${authenticated?.id}`}
                  />
                }
              >
                <Route path="/preview/:productId" element={<ProductPreview />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/add/:productId" element={<AddProduct />} />
                <Route path="/product/edit/:productId" element={<AddProduct />} />
                <Route path="/offers/:id" element={<Offers />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Route>
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default Router
