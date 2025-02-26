
const menuButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
menuButton.addEventListener('click', () => navMenu.classList.toggle('show'));

const changeButton = document.querySelector('.change');
const backButton = document.querySelector('.back');
const blank = document.getElementById('blank');

const defaultBackgroundColor = "#ffffff";
const defaultTextColor = "#7700ff";

changeButton.addEventListener('click', () => {
    blank.style.backgroundColor = getRandomColor();
    blank.style.color = getRandomColor();
});

backButton.addEventListener('click', () => {
    blank.style.backgroundColor = defaultBackgroundColor;
    blank.style.color = defaultTextColor;
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('')}`;
}


document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add');
    const inputField = document.querySelector('.item-input');
    const lista = document.querySelector('.lista');

    addButton.addEventListener('click', adicionarItem);
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') adicionarItem();
    });

    function adicionarItem() {
        const itemText = inputField.value.trim();
        if (!itemText) return alert('Por favor, digite um item!');

        const newItem = document.createElement('li');
        newItem.innerHTML = `${itemText} <button class="remove">X</button>`;

        newItem.addEventListener('dblclick', () => lista.removeChild(newItem));
        newItem.querySelector('.remove').addEventListener('click', () => lista.removeChild(newItem));

        lista.appendChild(newItem);
        inputField.value = '';
    }
});


const url = 'http://demo3241410.mockable.io/attempt';
fetch(url)
    .then(response => response.ok ? response.json() : Promise.reject('Erro na requisição'))
    .then(data => document.getElementById('mensagem').textContent = data.mensagem)
    .catch(console.error);







document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('dataForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Verifica se os campos estão preenchidos
        let errorMessage = '';
        if (!name) {
            errorMessage += 'Nome é obrigatório. ';
        }
        if (!email) {
            errorMessage += 'E-mail é obrigatório. ';
        }

        // Exibe a mensagem de erro, se houver algum campo faltando
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove(); // Remove mensagem de erro anterior, se houver
        }

        if (errorMessage) {
            const errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            errorSpan.textContent = errorMessage;
            errorSpan.style.color = 'red';
            form.appendChild(errorSpan);
            return; // Não envia o formulário se houver erro
        }

        // Se não houver erro, prossegue com o envio do formulário
        const data = {
            name: name,
            email: email
        };

        const url = 'https://demo3241410.mockable.io/';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(responseData => {
                console.log('Resposta do servidor:', responseData);

                const successMessage = document.createElement('p');
                successMessage.textContent = 'Enviado com Sucesso!';
                successMessage.style.color = 'green';
                successMessage.style.fontWeight = 'bold';
                successMessage.style.marginTop = '10px';

                form.appendChild(successMessage);

                form.reset();

                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            })
            .catch(error => {
                console.error('Erro ao enviar dados:', error);
                alert('Erro ao enviar os dados. Tente novamente.');
            });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://demo3241410.mockable.io/table'; // URL da requisição GET
    const tableBody = document.getElementById('tableBody');
    const filterButton = document.getElementById('filterButton');
    const resetButton = document.getElementById('resetButton');

    // Fazer a requisição GET
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            // Função para gerar o conteúdo da tabela (só o corpo)
            function generateTableContent(filteredData) {
                // Limpar o conteúdo atual do corpo da tabela
                tableBody.innerHTML = '';

                filteredData.forEach(item => {
                    const tr = document.createElement('tr');

                    const tdName = document.createElement('td');
                    tdName.textContent = item.name;
                    tr.appendChild(tdName);

                    const tdEmail = document.createElement('td');
                    tdEmail.textContent = item.email;
                    tr.appendChild(tdEmail);

                    const tdAge = document.createElement('td');
                    tdAge.textContent = item.age;
                    tr.appendChild(tdAge);

                    tableBody.appendChild(tr); // Adiciona a linha ao corpo da tabela
                });
            }

            // Função para filtrar pessoas com idade maior que 18
            function filterData(data) {
                return data.filter(item => item.age > 18);
            }

            // Exibe a tabela com todas as pessoas (apenas o corpo é gerado)
            generateTableContent(data);

            // Adiciona o evento de filtro para mostrar apenas pessoas com mais de 18 anos
            filterButton.addEventListener('click', () => {
                generateTableContent(filterData(data));
            });

            // Adiciona o evento de reset para mostrar todos os dados novamente
            resetButton.addEventListener('click', () => {
                generateTableContent(data);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
});



document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://demo3241410.mockable.io/attempt'; // Endpoint do mockable.io
    const dataForm = document.getElementById('dataForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const dataTableBody = document.getElementById('dataTableBody');
    const formError = document.getElementById('formError');

    // Função para carregar e listar dados
    function loadData() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const items = data.items || [];
                dataTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados
                items.forEach(item => {
                    const tr = document.createElement('tr');
                    const tdName = document.createElement('td');
                    const tdEmail = document.createElement('td');
                    tdName.textContent = item.name;
                    tdEmail.textContent = item.email;
                    tr.appendChild(tdName);
                    tr.appendChild(tdEmail);
                    dataTableBody.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
    }

    // Função para enviar os dados do formulário e adicionar um novo item
    function submitForm(event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Verifica se todos os campos estão preenchidos
        if (!name || !email) {
            formError.textContent = 'Todos os campos são obrigatórios!';
            return;
        }

        const newData = { name, email };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        })
        .then(response => response.json())
        .then(data => {
            formError.textContent = ''; // Limpa a mensagem de erro, se houver
            loadData(); // Atualiza a lista de dados com o novo item
            dataForm.reset(); // Limpa o formulário
        })
        .catch(error => {
            formError.textContent = 'Erro ao cadastrar, tente novamente.';
            console.error('Erro ao enviar dados:', error);
        });
    }

    // Carrega os dados ao carregar a página
    loadData();

    // Adiciona o evento de submit no formulário
    dataForm.addEventListener('submit', submitForm);
});

