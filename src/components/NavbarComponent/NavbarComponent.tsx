import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NavbarComponent=()=> {

  const apiUrl = process.env.routeUrl
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={"expand"} expand={expand}  bg="dark" data-bs-theme="dark" className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Fernando Chicaiza  / Technnical Test</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href={`${apiUrl}/UserPage/UserPage`}>Users</Nav.Link>
                  <Nav.Link href={`${apiUrl}/TodoPage/TodoPage`}>Tasks</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarComponent;