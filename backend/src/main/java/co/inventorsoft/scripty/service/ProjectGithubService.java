package co.inventorsoft.scripty.service;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import co.inventorsoft.scripty.exception.ApplicationException;

/**
 * @author lzabidovsky
 */
@Component
public class ProjectGithubService {

	private final static String GITHUB_REGEXP = "^https:\\/\\/github.com\\/.+?\\/(.+?).git$";

	public void cloneGithubRepo(String githubURL, String projectPath) {
		try {
			Git.cloneRepository()
					.setURI(githubURL)
					.setDirectory(new File(projectPath))
					.call();
		} catch (GitAPIException e) {
			throw new ApplicationException("Error cloning " + githubURL, HttpStatus.FAILED_DEPENDENCY);
		}
	}

	public String getGithubRepoName(String githubURL) {
		Pattern p = Pattern.compile(GITHUB_REGEXP, Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(githubURL);
		if(m.find()) {
			return m.group(1);
		} else {
			throw new ApplicationException("Error GitHub URL " + githubURL, HttpStatus.BAD_REQUEST);
		}
	}
}
