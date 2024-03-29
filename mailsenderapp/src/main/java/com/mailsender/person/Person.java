package com.mailsender.person;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "persons")
class Person {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "mail")
	private String mail;

	@Column(name = "last_message")
	private Date lastMessage;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinTable(name = "person_interest", joinColumns = { @JoinColumn(name = "person_id") }, inverseJoinColumns = {
			@JoinColumn(name = "interest_id") })
	Set<Interest> interests = new HashSet<>();

	public Person() {
		lastMessage = new Date(System.currentTimeMillis());
	};

	public Date getLastMessage() {
		return lastMessage;
	}

	public void setLastMessage(Date lastMessage) {
		this.lastMessage = lastMessage;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Set<Interest> getInterests() {
		return interests;
	}

	public void assignInterests(List<Interest> interests) {
		this.interests.clear();
		interests.forEach((interest) -> this.interests.add(interest));
	}

	public void updateDate() {
		lastMessage = new Date(System.currentTimeMillis());
	}

	public PersonDto translateToDto() {
		PersonDto dto = new PersonDto();
		dto.setName(this.getName());
		dto.setMail(this.getMail());
		this.interests.forEach((interest) -> dto.addInterest(interest.translateToDto()));
		dto.setId(this.getId());
		return dto;
	}

}
