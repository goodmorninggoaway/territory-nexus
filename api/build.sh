dockerImageName=vendex-nexus-api
gitBranch=$(git rev-parse --abbrev-ref HEAD)

docker build -t "$dockerImageName:$gitBranch" -t "$dockerImageName:latest" .
