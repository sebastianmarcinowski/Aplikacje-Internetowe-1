<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Competitor;
use App\Service\Router;
use App\Service\Templating;

class CompetitorController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $competitors = Competitor::findAll();
        $html = $templating->render('competitor/index.html.php', [
            'competitors' => $competitors,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestCompetitors, Templating $templating, Router $router): ?string
    {
        if ($requestCompetitors) {
            $competitor = Competitor::fromArray($requestCompetitors);
            // @todo missing validation
            $competitor->save();

            $path = $router->generatePath('competitor-index');
            $router->redirect($path);
            return null;
        } else {
            $competitor = new Competitor();
        }

        $html = $templating->render('competitor/create.html.php', [
            'competitor' => $competitor,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $competitorId, ?array $requestCompetitor, Templating $templating, Router $router): ?string
    {
        $competitor = competitor::find($competitorId);
        if (! $competitor) {
            throw new NotFoundException("Missing competitor with id $competitorId");
        }

        if ($requestCompetitor) {
            $competitor->fill($requestCompetitor);
            // @todo missing validation
            $competitor->save();

            $path = $router->generatePath('competitor-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('competitor/edit.html.php', [
            'competitor' => $competitor,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $competitorId, Templating $templating, Router $router): ?string
    {
        $competitor = Competitor::find($competitorId);
        if (! $competitor) {
            throw new NotFoundException("Missing competitor with id $competitorId");
        }

        $html = $templating->render('competitor/show.html.php', [
            'competitor' => $competitor,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $competitorId, Router $router): ?string
    {
        $competitor = competitor::find($competitorId);
        if (! $competitor) {
            throw new NotFoundException("Missing competitor with id $competitorId");
        }

        $competitor->delete();
        $path = $router->generatePath('competitor-index');
        $router->redirect($path);
        return null;
    }
}
