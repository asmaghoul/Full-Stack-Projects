package com.asma.asmaexam.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asma.asmaexam.models.Player;
import com.asma.asmaexam.repositories.PlayerRepository;

@Service
public class PlayerService {
	
	@Autowired
	private PlayerRepository playerRepo;
	
	public Player createPlayer(Player player) {
		return playerRepo.save(player);
	}
	
	public List<Player> allPlayers(){
		return playerRepo.findAll();
	}
	
	public Player findPlayer(Long id) {
		Optional<Player> optionalPlayer = playerRepo.findById(id);
		if(optionalPlayer.isPresent()) {
			return optionalPlayer.get();
		}
		else {
			return null;
		}
	}
	
	public Player updatePlayer(Player player) {
		return playerRepo.save(player);
	}
	
	public void deletePlayer(Long id) {
		Optional<Player> optionalPlayer=playerRepo.findById(id);
		if(optionalPlayer.isPresent()) {
			playerRepo.deleteById(id);
		}
	}
	public void deletePlayerFromTeam(Long playerId, Long teamId) {
        // Retrieve the player from the database
        Player player = playerRepo.findById(playerId).orElse(null);
        if (player == null) {
            // Handle the case where the player does not exist
            throw new IllegalArgumentException("Player not found with ID: " + playerId);
        }

        // Ensure that the player belongs to the specified team
        if (!player.getTeam().getId().equals(teamId)) {
            throw new IllegalArgumentException("Player with ID: " + playerId + " does not belong to team with ID: " + teamId);
        }

        // Remove the player from the team
        player.getTeam().getPlayers().remove(player);

        // Set the player's team to null
        player.setTeam(null);

        // Save the changes to update the database
        playerRepo.save(player);
    }
}