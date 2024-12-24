package com.asma.asmaexam.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.asma.asmaexam.models.Player;
import com.asma.asmaexam.models.Team;
import com.asma.asmaexam.models.User;
import com.asma.asmaexam.services.PlayerService;
import com.asma.asmaexam.services.TeamService;
import com.asma.asmaexam.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller

public class TeamController {
	
	@Autowired
	private UserService userServ;
	@Autowired
	private TeamService gServ;
	@Autowired
	private PlayerService pServ;
	
	// Your Teams section
	@GetMapping("/home")
	public String yourTeams(HttpSession session, Model model) {
		Long userId = (Long) session.getAttribute("userId");
		if(session.getAttribute("userId")==null)
    	{
    		return "redirect:/logout";
    		}
		 User loggedUser = userServ.findUser(userId);
		    model.addAttribute("loggedUser", loggedUser);
    	model.addAttribute("user", userServ.findById(userId));
    	model.addAttribute("teams", gServ.allTeams());
		return "/teams.jsp";
	}
	
	// New Team
	@GetMapping("/teams/new")
	public String newTeam(@ModelAttribute("newTeam")Team newTeam, Model model, HttpSession session) {
		
		if (session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		String[] weekdays = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
		model.addAttribute("weekdays", weekdays);
		User user = userServ.findById((Long)session.getAttribute("userId"));
		model.addAttribute("user", user);
		return "/new.jsp";
	}
	
	// Create New Team
	@PostMapping("/teams/new/team")
	public String postTeam(@Valid @ModelAttribute("newTeam")Team newTeam, BindingResult result,Model model, HttpSession session) {
		 Long userId = (Long) session.getAttribute("userId");
		if(result.hasErrors()) {
			return "/new.jsp";
		}
		 // Retrieve the logged-in user
	    User loggedUser = userServ.findUser(userId);
	    model.addAttribute("loggedUser", loggedUser);
		User user = userServ.findById((Long) session.getAttribute("userId"));
		
		gServ.create(newTeam, user);
		return "redirect:/home";
	}
	
	
	// Edit Team
	@GetMapping("/teams/edit/{id}")
	public String editTeam(@PathVariable("id")Long id, Model model) {
		String[] weekdays = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
		model.addAttribute("weekdays", weekdays);
		Team editTeam = gServ.findById(id);
		model.addAttribute("editTeam", editTeam);
		return "edit.jsp";
	}
	
	// Confirm Edit
	
	@PutMapping("/teams/edit/{id}")
	public String updateTeam(@Valid @ModelAttribute("editTeam") Team editTeam, BindingResult result,
	                         @RequestParam("userId") Long userId,
	                         
	                         Model model,
	                         HttpSession session) {
	    if (result.hasErrors()) {
	        return "edit.jsp";
	    }
	    
	    // Retrieve the user associated with the team
	    User user = userServ.findById(userId);
	    editTeam.setUser(user); // Set the user associated with the team
	    
	    gServ.update(editTeam);
	    return "redirect:/home";
	}
	
	// Delete a team
	/*@RequestMapping("/{id}/delete")
	public String deleteTeam(@PathVariable("id")Long id) {
		gServ.delete(id);
		return "redirect:/home";
	}*/
	@RequestMapping("/{id}/delete")
	public String deleteTeam(@PathVariable("id") Long id) {
	    // Retrieve the team by its ID
	    Team team = gServ.findById(id);
	    
	    // Check if the team exists
	    if (team != null) {
	        // Delete all players associated with the team
	        List<Player> players = team.getPlayers();
	        for (Player player : players) {
	            pServ.deletePlayer(player.getId());
	        }
	        
	        // Delete the team itself
	        gServ.delete(id);
	    }
	    
	    return "redirect:/home";
	}
	
	
	@GetMapping("/teams/view/{teamId}")
	public String showNewPlayerForm(@PathVariable("teamId") Long teamId, Model model, HttpSession session) {
	    // Check if the user is logged in
	    Long userId = (Long) session.getAttribute("userId");
	    if (userId == null) {
	        return "redirect:/logout"; // Redirect to logout if the user is not logged in
	    }

	    // Retrieve the logged-in user
	    User loggedUser = userServ.findUser(userId);
	    model.addAttribute("loggedUser", loggedUser);

	    // Retrieve the team by its ID
	    Team team = gServ.findById(teamId);
	    if (team == null) {
	        // If the team is not found, you can handle it accordingly
	        // For example, you can redirect to an error page or display a message
	        return "redirect:/home"; // Redirect to the teams page
	    }

	    // Retrieve the logged-in user (already retrieved)
	    User user = userServ.findById(userId);

	    // Add the team and user objects to the model
	    model.addAttribute("team", team);
	    model.addAttribute("user", user);

	    // Create a new Player object and add it to the model
	    Player newPlayer = new Player();
	    model.addAttribute("newPlayer", newPlayer);

	    // Add the team ID to the model
	    model.addAttribute("teamId", teamId);

	    // Return the view containing the form for creating a new player
	    return "show.jsp"; // Assuming you have a JSP file named newPlayerForm.jsp
	}


	
	@PostMapping("/teams/{teamId}/addplayer")
	public String addPlayerToTeam(
	    @Valid @ModelAttribute("newPlayer") Player newPlayer, BindingResult result,
	    @PathVariable("teamId") Long teamId,
	    HttpSession session, Model model) {
	    
	    // Check if the user is logged in
	    if (session.getAttribute("userId") == null) {
	        return "redirect:/logout"; // Redirect to logout if the user is not logged in
	    }

	    // Retrieve the logged-in user
	    Long userId = (Long) session.getAttribute("userId");
	    User user = userServ.findById(userId);

	    // Retrieve the team by its ID
	    Team team = gServ.findById(teamId);
	    if (team == null) {
	        // If the team is not found, you can handle it accordingly
	        // For example, you can redirect to an error page or display a message
	        return "redirect:/home"; // Redirect to the teams page
	    }

	    // Check if the size of players is less than 9
	    if (team.getPlayers().size() < 9) {
	        // Set the user and team for the new player
	        newPlayer.setUser(user);
	        newPlayer.setTeam(team);

	        // Add the new player to the team
	        team.getPlayers().add(newPlayer);

	        // Save the updated team with the new player
	        gServ.update(team);

	        // Redirect to the team view page after adding the player
	        return "redirect:/teams/view/" + teamId;
	    } else {
	        // Handle the case where the team already has 9 players
	    	  model.addAttribute("teamFullMessage", "The team is full and cannot accept more players");
	        return "redirect:/teams/view/" + teamId;
	    }
	}

	@RequestMapping("/teams/{teamId}/player/{playerId}/delete")
	public String deletePlayer(@PathVariable("teamId") Long teamId, @PathVariable("playerId") Long playerId) {
	    // Assuming you have a method in your service to delete a player by ID and team ID
	    pServ.deletePlayerFromTeam(playerId, teamId);
	    return "redirect:/teams/view/" + teamId;
	}
	
}