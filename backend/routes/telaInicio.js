import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TelaInicio() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Sistema de Gerenciamento</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/aluno">Aluno</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/disciplina">Disciplina</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/professor">Professor</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/sala">Sala</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/turma">Turma</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-3">
        <Route path="/aluno" component={Aluno} />
        <Route path="/disciplina" component={Disciplina} />
        <Route path="/professor" component={Professor} />
        <Route path="/sala" component={Sala} />
        <Route path="/turma" component={Turma} />
      </Container>
    </Router>
  );
}

function Aluno() {
  return <h2>Cadastro de Aluno</h2>;
}

function Disciplina() {
  return <h2>Cadastro de Disciplina</h2>;
}

function Professor() {
  return <h2>Cadastro de Professor</h2>;
}

function Sala() {
  return <h2>Cadastro de Sala</h2>;
}

function Turma() {
  return <h2>Cadastro de Turma</h2>;
}

export default TelaInicio;
