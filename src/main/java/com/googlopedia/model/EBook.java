package com.googlopedia.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ebooks")
public class EBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "cover_url")
    private String coverUrl;

    @Column(name = "external_link", nullable = false)
    private String externalLink;

    public EBook() {
    }

    public EBook(Long id, String title, String author, String description, String coverUrl, String externalLink) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.coverUrl = coverUrl;
        this.externalLink = externalLink;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getExternalLink() {
        return externalLink;
    }

    public void setExternalLink(String externalLink) {
        this.externalLink = externalLink;
    }
}
