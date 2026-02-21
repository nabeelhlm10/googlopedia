package com.googlopedia.service;

import com.googlopedia.model.Article;
import com.googlopedia.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository repository;

    public ArticleService(ArticleRepository repository) {
        this.repository = repository;
    }

    public List<Article> getAllArticles() {
        return repository.findAll();
    }

    public Article getArticleById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
    }

    public Article saveArticle(Article article) {
        return repository.save(article);
    }

    public Article updateArticle(Long id, Article articleDetails) {
        Article article = getArticleById(id);
        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());
        article.setAuthor(articleDetails.getAuthor());
        return repository.save(article);
    }

    public void deleteArticle(Long id) {
        repository.deleteById(id);
    }
}
