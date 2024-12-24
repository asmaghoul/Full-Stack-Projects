<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. -->
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Formatting (dates) -->
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Update Team</title>
<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/style.css">
<script src="/webjars/jquery/jquery.min.js"></script>
<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
	   
	<div class="container vh-100">
	<h3>Edit Team</h3>
		<h3>
			<a href="/home">Dashboard</a>
		</h3>
		<div>
			<div
				class="h-100 w-50 d-flex align-items-center justify-content-around"
				id="teamTable">
				<form:form action="/teams/edit/${editTeam.id}" method="POST"
					modelAttribute="editTeam"
					class="h-75 w-75 d-flex flex-column justify-content-evenly">
					<input type="hidden" name="_method" value="put">
					  <input type="hidden" name="userId" value="${editTeam.user.id}">
					<div class="row mb-3">
						<form:label path="name" class="col-sm-2 col-form-label mx-2">Name</form:label>
						<div class="col-sm-9">
							<form:input type="text" class="form-control" path="name" />
						</div>
					</div>
					<div class="row mb-1">
						<form:errors path="name" class="text-danger" />
					</div>
					<div class="row mb-3">
						<form:label path="skillLevel" class="col-sm-2 col-form-label mx-2">Skill Level (1-5)</form:label>
						<div class="col-sm-9">
							<form:input type="text" class="form-control" path="skillLevel" />
						</div>
					</div>
					<div class="row mb-1">
						<form:errors path="skillLevel" class="text-danger" />
					</div>

					<div class="row mb-3">
						<form:label path="weekDay" class="col-sm-2 col-form-label mx-2">Team Day :</form:label>
						<div class="col-sm-9">
							<form:select path="weekDay" class="form-select">
								<form:option value="">Choose a day</form:option>
								<c:forEach var="day" items="${weekdays}">
									<form:option value="${day}">${day}</form:option>
								</c:forEach>
							</form:select>
						</div>
					</div>
					<div class="row mb-1">
						<form:errors path="weekDay" class="text-danger" />
					</div>

					<button type="submit" class="btn btn-success goButton">Submit</button>
				</form:form>
			</div>
			<div class="btn-group">

				<a href="/${editTeam.id}/delete" class="btn btn-danger">Delete</a>
			</div>
		</div>
	</div>
</body>
</html>