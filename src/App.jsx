import React, { useState, useEffect } from 'react';
import './App.css'; // Importando o arquivo de estilos

// Componente para exibir palavra-chave via props (Exercício 8)
const KeywordDisplay = ({ keyword }) => {
  return <h2>Palavra-chave: {keyword}</h2>;
};

// Componente para buscar e exibir produtos da API (Exercícios 9, 10, 11)
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Buscar dos produtos (Exercícios 9, 12)
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para listar e buscar usuários por ID (Exercícios 13, 14)
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Buscar todos os usuários
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    } finally {
      setLoading(false);
    }
  };

  // Buscar um usuário por ID
  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${id}`);
      const data = await response.json();
      setSelectedUser(data);
    } catch (error) {
      console.error('Erro ao buscar usuário', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => fetchUserById(user.id)}>
            {user.name.firstname} {user.name.lastname}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h3>Usuário Selecionado</h3>
          <p>Nome: {selectedUser.name.firstname} {selectedUser.name.lastname}</p>
          <p>Email: {selectedUser.email}</p>
        </div>
      )}
    </div>
  );
};

// Componente de seleção de categoria (Exercícios 15, 16)
const CategorySelect = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  // Buscar categorias
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    }
  };

  // Buscar produtos por categoria
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  return (
    <div>
      <h2>Selecione uma Categoria</h2>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Selecione</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal App
const App = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <div className="app-container">
      <h1>Aplicação React - Exercícios</h1>

      {/* Exercício 8: Palavra-chave via props */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Digite uma palavra-chave"
      />
      <KeywordDisplay keyword={keyword} />

      {/* Exercícios 9 a 12: Lista de Produtos */}
      <ProductList />

      {/* Exercícios 13 e 14: Lista de Usuários e Detalhes por ID */}
      <UserList />

      {/* Exercícios 15 e 16: Menu de Categorias e Produtos */}
      <CategorySelect />
    </div>
  );
};

export default App;
