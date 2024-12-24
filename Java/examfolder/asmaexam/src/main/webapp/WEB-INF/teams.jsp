<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isErrorPage="true"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Your Teams</title>
<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
<link href='https://fonts.googleapis.com/css?family=Press Start 2P'
	rel='stylesheet'>
<link rel="stylesheet" href="/css/style.css">
<script src="/webjars/jquery/jquery.min.js"></script>
<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="container vh-100">

		<div class="d-flex flex-column">
			<div class="align-self-left">
				<h1>Welcome, ${user.userName}!</h1>
			</div>
			<div class="align-self-left">
				<h2>
					<a href="/logout">Logout</a>
				</h2>
			</div>
		</div>
		<div>
			<div
				class="h-75 w-75 d-flex align-items-center justify-content-center"
				id="teamTable">
				<div class="w-100 px-3 pt-3 overflow-auto">
					<table class="table text-black">
						<thead>
							<tr>
								<th>Team Name</th>
								<th>Skill Level (1-5)</th>
								<th>Players</th>
								<th>Game Day</th>
								
							</tr>
						</thead>
						<tbody>
							<c:forEach var="team" items="${teams}">

								<tr>
									<td><a href="/teams/view/${team.id}"
										class="btn btn-primary infoButton"><c:out
												value="${team.name}" /></a></td>
									<td><c:out value="${team.skillLevel}" /></td>
									<td><c:out value="${team.players.size()}" />/9</td>
									<td><c:out value="${team.weekDay}" /></td>
								

							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
			<div>

				<a href="/teams/new">
					<button class="btn btn-success" >Create New Team</button>
				</a>
			</div>
		</div>
	</div>
</body>
</html>