## Zad 1. Aplikacja

- [x] Przygotuj projekt: Rest Api + Baza Danych
- [x] Wrzuć kod do repo na gitlab
- [x] Napisz unit testy i testy integracyjne do swojej aplikacji
- [x] Wizualizacja api - np. swagger ui, open api
- [x] Przygotuj docker-compose w którym postawić środowisko "lokalne"
- [x] Przygotuj Dockerfile do budowania obrazu aplikacji

## Zad 2. CI/CD

- [x] Stwórz pipeline multibranch na Jenkins
- [x] W Jenkinsfile proszę zawsze dodać opcję:

  ```jenkinsfile
  pipeline {
    agent any
    options {
        timeout(5)
        gitLabConnection('GitLab')
    }
    triggers {
        gitlab(
            triggerOnPush: true,
            triggerOnMergeRequest: true,
            branchFilterType: 'All',
            addVoteOnMergeRequest: true
        )
    }
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
  }
  ```

- [x] Skonfiguruj projekt gitlab do triggerowania pipelinów na jenkinskie
- [x] Przygotuj webhooki
- [x] Stwórz pipeline który zbuduje, przetestuje, zbuduje obraz dockerowy
- [x] Dodaj stage do pipeline który dla brancha master wypchnie obraz do docker hub

## Zad 3. Kubernetes

- [x] Przygotowanie helm chartów lub obiektów kubernetesowych do uruchomienia backend rest api - z ingressen
- [x] Konfiguracja postgres + volumen danych
- [x] Przygotowanie config mapy z parametrami do połączenia aplikacji z bazą danych
- [x] Modyfikacja dockerfile żeby ustawić zmienne systemowe do połączenia z bazą danych
- [x] Parametryzowanie aplikacji backendowej - parametry powinny być wczytywane ze zmiennych systemowych
- [x] Dodanie do podów tworzenie zmiennych systemowych na podstawie danych z config mapy i secretów (hasło do bazy danych)
