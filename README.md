## Zad 1. Aplikacja

- [x] Przygotuj projekt: Rest Api + Baza Danych
- [x] Wrzuć kod do repo na gitlab
- [x] Napisz unit testy i testy integracyjne do swojej aplikacji
- [x] Wizualizacja api - np. swagger ui, open api
- [x] Przygotuj docker-compose w którym postawić środowisko "lokalne"
- [x] Przygotuj Dockerfile do budowania obrazu aplikacji

## Zad 2. CI/CD

- [ ] Stwórz pipeline multibranch na Jenkins
- [ ] W Jenkinsfile proszę zawsze dodać opcję:

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

- [ ] Skonfiguruj projekt gitlab do triggerowania pipelinów na jenkinskie
- [ ] Przygotuj webhooki
- [ ] Stwórz pipeline który zbuduje, przetestuje, zbuduje obraz dockerowy
- [ ] Dodaj stage do pipeline który dla brancha master wypchnie obraz do docker hub

## Zad 3. Kubernetes

- [ ] Przygotowanie helm chartów lub obiektów kubernetesowych do uruchomienia backend rest api - z ingressen
- [ ] Konfiguracja postgres + volumen danych
- [ ] Przygotowanie config mapy z parametrami do połączenia aplikacji z bazą danych
- [ ] Modyfikacja dockerfile żeby ustawić zmienne systemowe do połączenia z bazą danych
- [ ] Parametryzowanie aplikacji backendowej - parametry powinny być wczytywane ze zmiennych systemowych
- [ ] Dodanie do podów tworzenie zmiennych systemowych na podstawie danych z config mapy i secretów (hasło do bazy danych)
