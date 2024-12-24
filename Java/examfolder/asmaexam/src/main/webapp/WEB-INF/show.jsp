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
<title><c:out value="${team.name }" /></title>
<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/style.css">

</head>
<body>
	<div class="container">

		<div>
			<h1>Funny People</h1>
		</div>
		<h3>
			<a href="/home">Dashboard</a>
		</h3>
		<div>
			<div id="teamTable" style="font-family: 'Press Start 2P';">
				<div class="row">Team Name: ${team.name}</div>
				<div class="row">Added by: ${team.user.userName}</div>
				<div class="row">Skill Level: ${team.skillLevel}</div>
				<div class="row">Game Day: ${team.weekDay}</div>
			</div>
			<div>
				<h1>Players:</h1>
				<div class="mx-4 my-5 p-3 w-75 overflow-auto" id="teamTable">
					<c:forEach var="player" items="${team.players }">
						<div class="mb-3">
							<ul>
								<li><c:out value="${player.playerName }" /></li>
							</ul>
							<!-- Delete Player functionality -->
							<c:if test="${player.user.id == user.id }">
								<form action="/teams/${team.id}/player/${player.id}/delete"
									method="post">
									<input type="hidden" name="_method" value="delete"> <input
										type="submit" class="btn btn-link" value="Delete Your Player">
								</form>
							</c:if>
						</div>
					</c:forEach>
				</div>

				<!--Player Box-->
				<c:if test="${team.user.id == loggedUser.id}">

					<div>
						<h4>Add Player:</h4>
						<form:form action="/teams/${team.id }/addplayer" method="post"
							modelAttribute="newPlayer">
							<form:label path="playerName"
								class="col-sm-2 col-form-label mx-2">Player Name:</form:label>
							<form:errors path="playerName" />
							<form:input type="text" class="form-control" path="playerName" />
							<form:input type="hidden" path="team" value="${team.id }" />
							<form:input type="hidden" path="user" value="${user.id }" />
							<input type="submit" class="btn btn-success" value="Add">
						</form:form>
					</div>
					<div class="btn-group"></div>
					<c:if test="${team.user.id == loggedUser.id}">

						<a href="/teams/edit/${team.id}" class="btn btn-primary">Edit</a>
						<a href="/${team.id}/delete" class="btn btn-danger">Delete</a>
					</c:if>

				</c:if>


				<div>

					<div>
						<!-- Display the team full message if it exists -->
						<c:if test="${not empty teamFullMessage}">
							<div class="alert alert-danger" role="alert">
								<c:out value="${teamFullMessage}" />
							</div>
						</c:if>
					</div>
					<c:if test="${team.user.id != loggedUser.id}">
						<h3>You are not allowed to add Players!</h3>
					</c:if>
					<c:if test="${team.getPlayers().size() == 9}">
						<h3>You are not allowed to add more than 9 Players!</h3>
					</c:if>

				</div>
			</div>
		</div>
	</div>
</body>
</html>
