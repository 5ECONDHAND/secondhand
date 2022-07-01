import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Home, Auth, Product, AddProduct, Edit, Sales, Offers } from '../pages'
import { useSelector } from 'react-redux'
import ScrollToTop from '../components/atoms/global/ScrollToTop'

const Router = () => {
  // Globally set Navbar on every page (bugged)
  // const displayNavbar = ['/', '/product', '/add', '/edit', '/sales', '/offers'].includes(
  //   window.location.pathname
  //   window.location.reload() <--- will infinite reload
  // )
  // {displayNavbar && <Navbar />}

  const authenticated = useSelector((state) => state.persist.auth.user.name)
  // console.log('AUTH', authenticated)

  const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="*"
            element={
              <div
                style={{
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h2>404, the page you are looking for does not exist</h2>
              </div>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/product/:id" element={<Product />} />
          <Route element={<ProtectedRoute isAllowed={authenticated} />}>
            <Route path="/add" element={<AddProduct />} />
            <Route path="/add/:productId" element={<AddProduct />} />
            <Route path="/edit/:userId" element={<Edit />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/offers" element={<Offers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
