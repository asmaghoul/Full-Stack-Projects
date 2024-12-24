package com.asma.asmaexam.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asma.asmaexam.models.Team;
import com.asma.asmaexam.models.User;
import com.asma.asmaexam.repositories.TeamRepository;


@Service
public class TeamService {
	
	@Autowired
	private TeamRepository gRepo;
	
	public Team findById(Long id) {
		Optional<Team> result = gRepo.findById(id);
		if(result.isPresent()) {
			return result.get();
		}
		return null;
	}
	public List<Team> allTeams(){
		return gRepo.findAll();
	}
	public Team create(Team team, User user) {
		team.setUser(user);
		return gRepo.save(team);
	}
	public Team update(Team team) {
		return gRepo.save(team);
	}
	
	public void delete(Long id) {
		gRepo.deleteById(id);
	}
}
	
