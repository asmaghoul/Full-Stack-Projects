<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isErrorPage="true"%>
<!DOCTYPE html>
<html>
	<head>
		<!-- for Bootstrap CSS -->
		<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
		<!-- YOUR own local CSS -->
		<link rel="stylesheet" href="/css/style.css" />
		<link href='https://fonts.googleapis.com/css?family=Press Start 2P' rel='stylesheet'>	
		<!-- For any Bootstrap that uses JS or jQuery-->
		<script src="/webjars/jquery/jquery.min.js"></script>
		<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
		<meta charset="ISO-8859-1">
		<title>Login</title>
	</head>
	<body class="d-flex align-items-center justify-content-center vh-100">

		<div class="container d-flex flex-column align-items-center justify-content-evenly containerMax" id="gameTable">
			<h1>Welcome!</h1>
			<div class="d-flex justify-content-around w-100">
				<div class="register sm-2 lg-1">

					<h3>Register</h3>
					<form:form method="post" action="/register" modelAttribute="newUser">
						<div class="form-group">
							<form:label path="userName">User Name</form:label>
							<form:errors class="text-danger" path="userName" />
							<form:input class="form-control" path="userName" />
						</div>
						<div class="form-group">				
							<form:label path="email">Email</form:label>
							<form:errors class="text-danger" path="email" />
							<form:input class="form-control" path="email" />
						</div>
						<div class="form-group">
							<form:label path="password">Password</form:label>
							<form:errors class="text-danger" path="password" />
							<form:input class="form-control" path="password" type="password"/>
						</div>
						<div class="form-group">
							<form:label path="confirm">Confirm PW</form:label>
							<form:errors class="text-danger" path="confirm" />
							<form:input class="form-control" path="confirm" type="password"/>
						</div>
						<div class="mt-2 mb-3">
						<form:button class="btn btn-success" id="goButton">Register</form:button>
						</div>
					</form:form>
				</div>
				<div>
				
				</div>
				<div class="login sm-2 lg-1">
					<h3>Login</h3>
					<form:form method="post" action="/login" modelAttribute="newLogin">
					<div class="form-group">
						<form:label path="email">Email</form:label>
						<form:errors class="text-danger" path="email" />
						<form:input class="form-control" path="email" />
					</div>
						<div class="form-group">
							<form:label path="password">Password</form:label>
							<form:errors class="text-danger" path="password" />
							<form:input class="form-control" path="password" type="password"/>
						</div>
						<div class="mt-2">
							<form:button class="btn btn-success" id="goButton">Login</form:button>
						</div>
					</form:form>
				</div>
			</div>
		</div>
	</body>
</html>