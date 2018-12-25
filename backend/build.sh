dockerImageName=vendex-nexus-backend
gitBranch=$(git rev-parse --abbrev-ref HEAD)

docker build -t "$dockerImageName:$gitBranch" -t "$dockerImageName:latest" .
