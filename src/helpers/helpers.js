const hbs = require('hbs');


hbs.registerHelper('listarArticulos', (articulos) => {		
	texto = ""
	articulos.forEach ( art => {
	
	texto =  texto + `
	<div class="col-lg-3 col-md-6">
                        <div class="card">
                            <div class="el-card-item">
									<div class="el-card-avatar el-overlay-1"> <img src="data:img/jpeg;base64,${art.imagen.toString('base64')}" alt="user" />
									<div class="el-overlay">
										<ul class="list-style-none el-info">
											<li class="el-item"><a class="btn default btn-outline image-popup-vertical-fit el-link" href="#"><i class="icon-magnifier"></i></a></li>
											<li class="el-item"><a class="btn default btn-outline el-link" href="javascript:void(0);"><i class="icon-link"></i></a></li>
										</ul>
									</div>
									</div>
										<div class="d-flex no-block align-items-center">
											<div class="m-l-15">
												<h4 class="m-b-0">${art.nombre}</h4>
												<span class="text-muted">${art.descripcion}</span>
											</div>
											<div class="ml-auto m-r-15">
													<button type="button" class="btn btn-dark btn-circle">$${art.precio}</button>
											</div>
								       </div>
                                 </div>
                        </div>
                    </div>
	
`;

	});
	return texto;
	
});

hbs.registerHelper('listarProductosCart', (productos) => {		
	texto = ""
	productos.forEach ( art => {
	texto =  texto + `
	<tr>
		<td width="150"><img src="data:img/jpeg;base64,${art.imagen.toString('base64')}" alt="iMac" width="80"></td>
		<td width="550">
			<h5 class="font-500">${art.nombre}</h5>
			<p>${art.descripcion}</p>
		</td>
		<td>$${art.precio}</td>
		<td width="70">
			<input type="text" class="form-control" placeholder="1">
		</td>
		<td width="150" align="center" class="font-500">$${art.precio}</td>
		<td align="center"><a href="javascript:void(0)" class="text-inverse" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash text-dark"></i></a></td>
	</tr>
	`;

	});
	return texto;
	
});

hbs.registerHelper('listarUsuarios', (usuarios) => {
	let texto = '';
	usuarios.forEach((usr) => {
		texto += `<tr role="row" class="odd">
			 <td class="sorting_1">${usr.firstname}</td>
			 <td>${usr.lastname}</td>
			 <td>${usr.cc}</td>
			 <td class="cell100 column4">   
			   <div class="inblock" >
				 <i id="edit" data-id="${usr.cc}" class="fa fa-pencil" ></i>
				 <i id="delete" data-id="${usr.cc}" class="fa fa-trash"></i>
				 <input type="checkbox" data-id="${usr.cc}" class="check"/> 
			   </div>
			 </td>
            </tr>`;
	});
	return texto;
});

hbs.registerHelper('listarProductos', (productos) => {
	let texto = '';
	productos.forEach((prod) => {
		texto += `<tr id="${prod._id}" role="row" class="odd">
		 <td class="sorting_1">${prod.nombre}</td>
		 <td>${prod.categoria}</td>
		 <td>${prod.precio}</td>
		 <td class="cell100 column4">   
		   <div class="inblock" >
			 <i id="edit" data-id="${prod._id}" class="fa fa-pencil" ></i>
			 <i id="delete" data-id="${prod._id}" class="fa fa-trash"></i>
			 <i id="shop" data-id="${prod.id}" class="fa fa-cart-plus cartshop"></i>
			 <input type="checkbox" data-id="${prod._id}" class="check"/> 
		   </div>
		 </td>
		</tr>`;
	});
	return texto;
});

hbs.registerHelper('listarProductosTienda', (productos) => {
	let texto = '';
	productos.forEach((prod) => {
		texto += `<tr role="row" class="odd">
		 <td class="sorting_1">${prod.nombre}</td>
		 <td>${prod.cantidad}</td>
		 <td>${prod.sede}</td>
		</tr>`;
	});
	return texto;
});

let str = '"<button class="btn btn-outline-secondary" type="submit" id="button-addon2">Modificar</button>"';

hbs.registerHelper('listarProductosTiendaUpdate', (productos) => {
	let texto = '';
	productos.forEach((prod) => {
		texto += `<form action="/updatestock" method="get"><tr role="row" class="odd">
		 <td class="sorting_1">${prod.nombre}</td>
		 <td>
			<div class="input-group mb-3">
				<input type="number" class="form-control" placeholder="${prod.cantidad}" aria-label="cantidad" name="cantidad" aria-describedby="button-addon2">
				<input type="text" name="nombre" value="${prod.nombre}" hidden>
				<div class="input-group-append">
					<button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
					Modificar
					</button>

					<!-- Modal -->
					<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLongTitle">Éxito</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							El producto está ahora actualizado.
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn btn-secondary" data-dismiss="modal">Aceptar</button>
						</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		 </td>
		 <td>${prod.sede}</td>
		</tr></form>`;
	});
	return texto;
});

hbs.registerHelper('disponibleCourses', (listado) => {
	let texto = ' ';
	let count = 1;
	listado.forEach((curso) => {
		console.log(curso.nombre);
		texto += `<div id='accordion'>
				 <div class="card mb-2">
				     <div class="card-header" id="heading${count}">
				       <h5 class="mb-0">
				         <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${count}" aria-expanded="false" aria-controls="collapse${count}">
				          CURSO: ${curso.name} VALOR: ${curso.value} DESCRIPCION: ${curso.description}
				         </button>
				       </h5>
				     </div>
				     <div id="collapse${count}" class="collapse " aria-labelledby="heading${count}" data-parent="#accordion">
				       <div class="card-body">
				         <p>Descripción: ${curso.description}</p>
								 <p>MODALIDAD: ${curso.modality}</p>
								 <p>INTENSIDAD HORARIA: ${curso.intensity}</p>
				       </div>
				     </div>
				  </div>
					</div>`;
		console.log(count);
		count += 1;
	});
	console.log(texto);
	return texto;
});

// Incribir cursos con mongodb y listarlos mongo

hbs.registerHelper('inscription', (listado) => {
	let texto = `	<form action="/dashboarduser" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Valor</th>
					<th>Intensidad</th>
					<th>Modalidad</th>
					<th></th>
					<th></th>
					</thead>
					<tbody>`;
	listado.forEach((materia) => {
		texto +=
					`<tr>
					<td> ${materia.name} </td>
					<td> ${materia.value} </td>
					<td> ${materia.intensity}</td>
					<td> ${materia.modality} </td>
					<td><button class="btn btn-primary" name="ver" id="informacion">Ver</button></td>
					<td><button class="btn btn-primary" name="inscribir" value="${materia.name}">Inscribir</button></td>
					</tr> `;
	});
	texto += '</tbody> </table></form>';
	return texto;
});

// Cerrar cursos y listarlos mongo

hbs.registerHelper('closeCourse', (courses) => {
	let texto = `	<form action="/dashboardadmin" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Valor</th>
					<th>Intensidad</th>
					<th>Modalidad</th>
					<th>Estado</th>
					<th></th>
					<th></th>
					</thead>
					<tbody>`;
	courses.forEach((course) => {
		// switch
		let switchVal = 'cerrar';
		if (course.state === 'Cerrado') {
			switchVal = 'abrir';
		}
		console.log(course.students);
		const myJSON = JSON.stringify(course.students);

		texto +=
					`<tr>
					<td> ${course.name} </td>
					<td> ${course.value} </td>
					<td> ${course.intensity}</td>
					<td> ${course.modality} </td>
					<td> ${course.state}</td>
					<td>
						<p>
						  <button class="btn btn-primary" type="submit" data-toggle="collapse" data-target="#collapseExample${course.name}" aria-expanded="false" aria-controls="collapseExample${course.name}" name="inscritos" value="${course.name}">
						    Inscritos
						  </button>
						</p>
						<div class="collapse" id="collapseExample${course.name}">
						  <div class="card card-body">
						     ${myJSON}
						  </div>
						</div>
					</td>
					<td><button class="btn btn-primary" type="submit" name=${switchVal} value="${course.name}">${switchVal}</button></td>
					</tr> `;
	});
	texto += "</tbody> </table><input type='hidden' name='asigna'  value='asigna'></form>";
	return texto;
});

// Ayuda para la visualización de imagenes
hbs.registerHelper('imagerSource', photo => (photo ?
	`data:img/jpeg;base64,${photo.toString('base64')}` :
	'../../assets/images/gallery/product_default.png'));


// Eliminar inscripcion mongo

hbs.registerHelper('cancelIncription', (miscursos) => {
	let texto = `	<form action="/dashboarduser" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Valor</th>
					<th>Intensidad</th>
					<th>Modalidad</th>
					<th></th>
					</thead>
					<tbody>`;
	miscursos.forEach((materia) => {
		texto +=
					`<tr>
					<td> ${materia.name} </td>
					<td> ${materia.value} </td>
					<td> ${materia.intensity}</td>
					<td> ${materia.modality} </td>
					<td><button class="btn btn-danger" name="eliminar" value="${materia.name}">Cancelar</button></td>
					</tr> `;
	});
	texto += '</tbody> </table></form>';
	return texto;
});

// Modificar usuarios y listarlos mongo

hbs.registerHelper('modifyUser', (misusuarios) => {
	let texto = `	<form action="/dashboardadmin" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Cédula</th>
					<th></th>
					</thead>
					<tbody>`;
	misusuarios.forEach((usuario) => {
		texto +=
					`<tr>
					<td> ${usuario.firstname} </td>
					<td> ${usuario.lastname} </td>
					<td> ${usuario.cc}</td>
					<td><button class="btn btn-info" name="modificar" value="${usuario._id}">Modificar</button></td>
					</tr> `;
	});
	texto += '</tbody> </table></form>';
	return texto;
});

// Listar y asignar docentes mongo

hbs.registerHelper('assignTeacher', (teachers) => {
	let texto = `	<form action="/dashboardadmin" method="post" name="myform">
					<select class="form-control" name='profesor' onchange="myform.submit()">
					<option selected="">Elija el profesor</option>`;
	teachers.forEach((teacher) => {
		texto +=
					`<option value="${teacher.cc}">${teacher.firstname}</option>`;
	});
	texto += '</select></form>';
	return texto;
});

// Informacion cursos y estudiantes (profesor) mongo

hbs.registerHelper('infoTeachers', (materias) => {
	let texto = `	<form action="/dashboardadmin" method="post">
			<table class='table table-striped table-hover'>
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Valor</th>
					<th>Intensidad</th>
					<th>Modalidad</th>
					<th>Estado</th>
					<th></th>
					</thead>
					<tbody>`;
	materias.forEach((element) => {
		const { cursos } = element;
		cursos.forEach((curso) => {
			console.log(`estudiantes en curso ${curso.name}: ${curso.students}`);
			const students = JSON.stringify(curso.students);
			console.log(students);

			texto +=
						`<tr>
						<td> ${curso.name} </td>
						<td> ${curso.value} </td>
						<td> ${curso.intensity}</td>
						<td> ${curso.modality} </td>
						<td> ${curso.state}</td>
						<td>
							<p>
							  <button class="btn btn-primary" type="submit" data-toggle="collapse" data-target="#collapseExample${curso.name}" aria-expanded="false" aria-controls="collapseExample${curso.name}" name="inscritos" value="${curso.name}">
							    estudiantes
							  </button>
							</p>
							<div class="collapse" id="collapseExample${curso.name}">
							  <div class="card card-body">
							     ${students}
							  </div>
							</div>
						</td>
						</tr> `;
		});
	});
	texto += '</tbody></table></form>';
	return texto;
});
