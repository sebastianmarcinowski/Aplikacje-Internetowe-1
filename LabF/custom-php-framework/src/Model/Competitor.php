<?php
namespace App\Model;

use App\Service\Config;

class Competitor
{
    private ?int $id = null;
    private ?string $name = null;
    private ?string $surname = null;
    private ?float $weight = null;
    private ?int $wins = null;
    private ?int $losses = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Competitor
    {
        $this->id = $id;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): Competitor
    {
        $this->name = $name;
        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(?string $surname): Competitor
    {
        $this->surname = $surname;
        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(?float $weight): Competitor
    {
        $this->weight = $weight;
        return $this;
    }

    public function getWins(): ?int
    {
        return $this->wins;
    }

    public function setWins(?int $wins): Competitor
    {
        $this->wins = $wins;
        return $this;
    }

    public function getLosses(): ?int
    {
        return $this->losses;
    }

    public function setLosses(?int $losses): Competitor
    {
        $this->losses = $losses;
        return $this;
    }

    public static function fromArray($array): Competitor
    {
        $competitor = new self();
        $competitor->fill($array);
        return $competitor;
    }

    public function fill($array): Competitor
    {
        if (isset($array['id']) && !$this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['name'])) {
            $this->setName($array['name']);
        }
        if (isset($array['surname'])) {
            $this->setSurname($array['surname']);
        }
        if (isset($array['weight'])) {
            $this->setWeight($array['weight']);
        }
        if (isset($array['wins'])) {
            $this->setWins($array['wins']);
        }
        if (isset($array['losses'])) {
            $this->setLosses($array['losses']);
        }
        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM competitor';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $competitors = [];
        $competitorsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($competitorsArray as $competitorArray) {
            $competitors[] = self::fromArray($competitorArray);
        }
        return $competitors;
    }

    public static function find($id): ?Competitor
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM competitor WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $competitorArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (!$competitorArray) {
            return null;
        }
        $competitor = Competitor::fromArray($competitorArray);
        return $competitor;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (!$this->getId()) {
            $sql = "INSERT INTO competitor (name, surname, weight, wins, losses) VALUES (:name, :surname, :weight, :wins, :losses)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'name' => $this->getName(),
                'surname' => $this->getSurname(),
                'weight' => $this->getWeight(),
                'wins' => $this->getWins(),
                'losses' => $this->getLosses(),
            ]);
            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE competitor SET name = :name, surname = :surname, weight = :weight, wins = :wins, losses = :losses WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':name' => $this->getName(),
                ':surname' => $this->getSurname(),
                ':weight' => $this->getWeight(),
                ':wins' => $this->getWins(),
                ':losses' => $this->getLosses(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM competitor WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([':id' => $this->getId()]);

        $this->setId(null);
        $this->setName(null);
        $this->setSurname(null);
        $this->setWeight(null);
        $this->setWins(null);
        $this->setLosses(null);
    }
}